export function SpeciesDropdown(props) {
    const {setSpeciesQuery} = props;
    return(
        <div>
            <label htmlFor="species">Species: </label>
            <select name='species' id='species' defaultValue={""} onChange={(e) => {
                setSpeciesQuery(e.target.value)
            }}>
                <option value="">All</option>
                <option value="alligator">Alligator</option>
                <option value="anteater">Anteater</option>
                <option value="bear">Bear</option>
                <option value="bird">Bird</option>
                <option value="bull">Bull</option>
                <option value="cat">Cat</option>
                <option value="chicken">Chicken</option>
                <option value="cow">Cow</option>
                <option value="cub">Cub</option>
                <option value="deer">Deer</option>
                <option value="dog">Dog</option>
                <option value="duck">Duck</option>
                <option value="eagle">Eagle</option>
                <option value="elephant">Elephant</option>
                <option value="frog">Frog</option>
                <option value="goat">Goat</option>
                <option value="gorilla">Gorilla</option>
                <option value="hamster">Hamster</option>
                <option value="hippo">Hippo</option>
                <option value="horse">Horse</option>
                <option value="kangaroo">Kangaroo</option>
                <option value="koala">Koala</option>
                <option value="lion">Lion</option>
                <option value="monkey">Monkey</option>
                <option value="mouse">Mouse</option>
                <option value="octopus">Octopus</option>
                <option value="ostrich">Ostrich</option>
                <option value="penguine">Penguin</option>
                <option value="pig">Pig</option>
                <option value="rabbit">Rabbit</option>
                <option value="rhino">Rhino</option>
                <option value="sheep">Sheep</option>
                <option value="squirrel">Squirrel</option>
                <option value="tiger">Tiger</option>
                <option value="wolf">Wolf</option>
            </select>
        </div>
    )
}


export function PersonalityDropdown (props) {
    const {setPersonalityQuery} = props;
    return(
        <div>
            <label htmlFor="personality">Personality: </label>
            <select name='personality' id='personality' defaultValue={""} onChange={(e) => {
                setPersonalityQuery(e.target.value)
            }}>
                <option value="">All</option>
                <option value="cranky">Cranky</option>
                <option value="jock">Jock</option>
                <option value="lazy">Lazy</option>
                <option value="normal">Normal</option>
                <option value="peppy">Peppy</option>
                <option value="sisterly">Sisterly</option>
                <option value="smug">Smug</option>
                <option value="snooty">Snooty</option>
            </select>
        </div>
    )
}

export function GenderDropdown(props) {
    const {setGenderQuery} = props;
    return(
        <div>
            <label htmlFor="gender">Gender: </label>
            <select name='gender' id='gender' defaultValue={""} onChange={(e) => {
                setGenderQuery(e.target.value)
            }}>
                <option value="">All</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
        </div>
    )
}