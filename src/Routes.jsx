import { useState, useRef, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux';
import { selectFavorites } from './redux/favoritesSlice';

import { AmiiboElement } from './components/amiiboElement';

import { SpeciesDropdown, PersonalityDropdown, GenderDropdown } from './components/dropdownElements';

let currid = 1;
import {
    Link,
    NavLink,
    Outlet,
    useOutletContext,
    useParams,
    useSearchParams,
    useRouteError
} from 'react-router-dom'

export function Home(props) {
    const [searchParams, setSearchParams] = useSearchParams()
    const [uinput, setUinput] = useState("")

    const queryName = searchParams.get('name')
    const querySpecies = searchParams.get('species')
    const queryPersonality = searchParams.get('personality')
    const queryGender = searchParams.get('gender')

    let params = {
        name: queryName,
        species: querySpecies,
        personality: queryPersonality,
        gender: queryGender
    }

    //The inputted query is the search query or an empty string
    const [nameQuery, setNameQuery] = useState(params.name || "")
    const [speciesQuery, setSpeciesQuery] = useState(params.species || "")
    const [personalityQuery, setPersonalityQuery] = useState(params.personality || "")
    const [genderQuery, setGenderQuery] = useState(params.gender || "")

    

    const { fetchStatus, isLoading, error, data } = useQuery({
        queryKey: ["getAmiibos", params],
        queryFn: async () => {
            try{
                console.log("query: ", params)
                const res = await fetch(
                    'http://127.0.0.1:5000/query', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(params)
                    }
                )
                return res.json()
            }
            catch (error) {
                console.error("error: ", error)
            }

        }
    })
    
    return (
        <>
            <div>
                <form className='search-form' onSubmit={e => {
                    e.preventDefault()

                    setSearchParams({name: nameQuery, gender: genderQuery, personality: personalityQuery, species: speciesQuery})
                    // console.log("Params: ", params)
                }}>
                    <div className='search-bar'>
                        <input type='text' id='name' value={nameQuery} className='search-bar' onChange={(e) => {
                            setNameQuery(e.target.value)
                        }} />
                        <input type='submit' value="Search" className='search-button' />
                    </div>
                    <PersonalityDropdown setPersonalityQuery={setPersonalityQuery} />
                    <SpeciesDropdown setSpeciesQuery={setSpeciesQuery} />
                    <GenderDropdown setGenderQuery={setGenderQuery} />
                    <input type='reset' onClick={(e) => {
                        setGenderQuery("")
                        setPersonalityQuery("")
                        setNameQuery("")
                        setSpeciesQuery("")
                        setSearchParams({name: "", gender: "", personality: "", species: ""})
                    }}/>
                </form>
                <div className='results-box'>

                    {/* <h1 key={amiibos.id}>{amiibos.name}</h1> */}
                    {data && data.map(amiibo => (
                        <AmiiboElement 
                            key={currid++}
                            who={amiibo}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export function Owned() {
    const favorites = useSelector(selectFavorites)
    return (
        <>
            <h2>Owned List</h2>
            {console.log("Favorites in Owned(): ", favorites)}
            <ul>
                {Object.keys(favorites).map(amiibo => (
                    <li key={`favorite${favorites[amiibo].id}`}>
                        <Link to={favorites[amiibo].url}>
                            {favorites[amiibo].name}
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    )
}


export function ErrorPage() {
    const error = useRouteError()
    console.error(error)
    return (
        <>
            <h1>404: Page not found</h1>
            <p>{error.statusText || error.message}</p>
        </>
    )
}