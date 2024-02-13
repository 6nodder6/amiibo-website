// import fs from 'fs'

import { useState } from "react"
const API_KEY = "26b6d7c2-a054-4308-bce3-4f8c956cc675"

export function LikeButton(props) {
    const { who } = props
}

export function AmiiboElement(props) {
    const { who, favorites, setFavorites } = props
    // console.log(favorites)
    const [isOwned, setIsOwned] = useState(false)

    return (
        <div className="outer-box">
            <div className="amiibo-top">
                <h1>{who.name}</h1>
                <LikeButton who={who} />
            </div>
            <div className="photo-elem">
                <img src={who.image_url} alt={`Photo of ${who.name}`}></img>
            </div>
            <div className="amiibo-info">
                <h5>{`Type: ${who.personality}`}</h5>
                <h5>{`Species: ${who.species}`}</h5>
                <h5>{`Gender: ${who.gender}`}</h5>
                <button onClick={() => {
                    if (!isOwned) {
                        setFavorites(prev =>
                            [{
                                "name": who.name,
                                "url": `/?q=${who.name}`,
                                "id": who.id
                            }, ...prev]
                        )
                        console.log("Favorites after adding: ", favorites)
                        setIsOwned(true)
                    }
                    // If it is already owned
                    else {
                        var favoritesData = [...favorites]
                        var index = -1
                        favorites.find((amiibo, i) => {
                            if (amiibo.name === who.name) {
                                index = i;
                                return i;
                            }
                        })
                        console.log("Index: ", index)
                        favoritesData.splice(index, 1)
                        setFavorites(favoritesData)
                        console.log("Favorites after removal: ", favorites)
                        setIsOwned(false)
                    }

                }}>{isOwned ? "Mark as not owned" : "Mark as owned"}</button>
            </div>
        </div >
    )
}