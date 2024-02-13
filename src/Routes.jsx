import { useState, useRef, useEffect } from 'react'

const API_KEY = "26b6d7c2-a054-4308-bce3-4f8c956cc675"

import {
    Link,
    NavLink,
    Outlet,
    useOutletContext,
    useParams,
    useSearchParams,
    useRouteError
} from 'react-router-dom'

import {
    AmiiboElement
} from './App'
// const api_key = "26b6d7c2-a054-4308-bce3-4f8c956cc675"

export function Root(props) {
    const { children } = props

    const [favorites, setFavorites] = useState([])


    // setFavorites((prev) => [
    //     {
    //         "name": "Coach",
    //         "url": `https://api.nookipedia.com/villagers?name=coach&api_key=${API_KEY}`
    //     },
    //     ...prev])
    console.log("Favorites in root: ", favorites)

    return (
        <>
            <aside>

                <nav>
                    <ul>
                        <li>
                            <NavLink to="/">
                                HOME
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/owned">
                                OWNED
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/collections">
                                COLLECTIONS
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/profile">
                                PROFILE
                            </NavLink>
                        </li>
                    </ul>

                </nav>

            </aside>

            <main>
                {children || <Outlet context={[favorites, setFavorites]} />}
            </main>
        </>
    )
}

export function Home(props) {
    const [searchParams, setSearchParams] = useSearchParams()
    const [uinput, setUinput] = useState("")
    const query = searchParams.get("q")
    console.log("Query: ", query)
    //The inputted query is the search query or an empty string
    const [inputtedQuery, setInputtedQuery] = useState(query || "")

    console.log("inputtedQuery: ", inputtedQuery)
    const [amiibos, setAmiibos] = useState([])

    const [favorites, setFavorites] = useOutletContext()
    console.log(favorites)
    const [error, setError] = useState(null)

    // Use an effect because we're maintaining a connection with the API
    useEffect(() => {
        async function searchAmiibos() {
            try {
                console.log("Query in searchAmiibos: ", query)
                const res = await fetch(query ? `https://api.nookipedia.com/villagers?name=${query.toLowerCase()}&api_key=${API_KEY}` : `https://api.nookipedia.com/villagers?api_key=${API_KEY}`)

                console.log("Response from API: ", res)
                const resBody = await res.json()
                console.log("resBody.name: ", resBody[0].name)

                console.log("ResBody: ", resBody)
                // Set the amiibo array to be either the response array or an empty array if nothing is returned
                // console.log("resBody.items: ", resBody.items)

                console.log("resbody[0]: ", resBody[0])
                setAmiibos(resBody || [])
                console.log("amiibos: ", amiibos)

                setError(null)
            }
            catch (err) {
                console.error(err)
                setError(err)
            }
        }
        // If the query is not empty, look for the results
        // if (query) {
        // console.log("searching")
        searchAmiibos()
        // }
    }, [query])

    return (
        <>
            <div>
                <form className='search-form' onSubmit={e => {
                    e.preventDefault()
                    setSearchParams({ q: inputtedQuery })
                }}>
                    <input type='text' value={inputtedQuery} className='search-bar' onChange={(e) => {
                        setInputtedQuery(e.target.value)
                    }} />
                    {console.log(uinput)}
                    <input type='submit' value="Submit" className='search-button' />
                </form>
                <div className='results-box'>

                    {/* <h1 key={amiibos.id}>{amiibos.name}</h1> */}
                    {amiibos.map(amiibo => (
                        <AmiiboElement who={amiibo}
                            favorites={favorites}
                            setFavorites={setFavorites}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}


// export function SearchResults(props) {
//     const { Qname, Qspecies, Qtype } = props
//     console.log("Qname: ", Qname)
//     console.log("Qspecies: ", Qspecies)
//     console.log("Qtype: ", Qtype)

//     var resBody = ""

//     async function getAmiibo() {
//         const res = await fetch(
//             `https://api.nookipedia.com/villagers?name=${Qname.toLowerCase()}&api_key=26b6d7c2-a054-4308-bce3-4f8c956cc675`
//         )

//         resBody = await res.json()
//         // console.log("resBody: ", resBody)
//     }


//     // console.log("ResBody: ", resBody)

// }

export function Owned() {
    const [favorites, setFavorites] = useOutletContext()
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