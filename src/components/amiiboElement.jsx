import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toggleFavorite, selectIfIsOwned } from "../redux/favoritesSlice"

export function AmiiboElement(props) {
    const dispatch = useDispatch()

    const { who } = props
    // console.log(favorites)

    const isOwned = useSelector(state => selectIfIsOwned(state, who.id))

    return (
        <div className="outer-box">
            <div className="amiibo-top">
                <h1>{who.name}</h1>
                {/* <LikeButton who={who} /> */}
            </div>
            <div className="photo-elem">
                <img src={who.image_url} alt={`Photo of ${who.name}`}></img>
            </div>
            <div className="amiibo-info">
                <p>{`Type: ${who.personality}`}</p>
                <p>{`Species: ${who.species}`}</p>
                <p>{`Gender: ${who.gender}`}</p>
                <button onClick={() => {
                    dispatch(toggleFavorite({
                        name: who.name,
                        personality: who.personality,
                        gender: who.gender,
                        url: `/?name=${who.name}`,
                        image_url: who.image_url,
                        id: who.id
                    }))
                }}>{isOwned ? "Mark as not owned" : "Mark as owned"}</button>
            </div>
        </div >
    )
}




// garbage
                    // if (!isOwned) {
                    //     setFavorites(prev =>
                    //         [{
                    //             "name": who.name,
                    //             "url": `/?name=${who.name}`,
                    //             "id": who.id
                    //         }, ...prev]
                    //     )
                    //     console.log("Favorites after adding: ", favorites)
                    //     setIsOwned(true)
                    // }
                    // // If it is already owned
                    // else {
                    //     var favoritesData = [...favorites]
                    //     var index = -1
                    //     favorites.find((amiibo, i) => {
                    //         if (amiibo.name === who.name) {
                    //             index = i;
                    //             return i;
                    //         }
                    //     })
                    //     console.log("Index: ", index)
                    //     favoritesData.splice(index, 1)
                    //     setFavorites(favoritesData)
                    //     console.log("Favorites after removal: ", favorites)
                    //     setIsOwned(false)
                    // }