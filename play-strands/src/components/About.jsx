import Navbar from "./Navbar";
function About(){
    return(
        <>
        <Navbar></Navbar>
            <h1 style={{margin: "100px", textAlign:"center"}}>My-Strands</h1>
            <h2>About</h2>
            <p>I developed this little version of Strands from the NYT due to my love for their game</p>
            <p>After graduating college I decided to work on a few projects and I really had fun creating this one</p>
            <p>Heres a <a href="www.raphael-forward.com">link</a> to my website if you want to look at what else I have done </p>
            <p>Also heres a <a href="https://github.com/rafe-forward/playstrands">link</a> to the repository!</p>
            <p>There were a lot of struggles and fun little problems to solve, and im not quite done (Mobile Verion)</p>
            <p>The generation was probably the hardest part of this so ill go a little into how I solved it</p>
            <ul>
                <li>In order to generate a truly playable somewhat random game I decided to put some limits</li>
                <li>For example I made the game only 7 words to save some compute power and also make it a little faster and easier to implement</li>
            </ul>
            <p>Ill take you through the steps of the algorithm now </p>
            <ol>
                <li>The first step was placing the Spanagram. I did this by chosing two random sides on opposing edges then running a recursive dfs
                    algorithm that attempted to find a path with length equal to the size of the word
                </li>
                <li>Next I calculated the availible spaces on each side, using this number I implemented a 3 sum algorithm that found 3 words whose 
                    lengths were equal to one of those sides (then selected one pair of three randomly)
                </li>
                <li> After this I used a BFS algo which placed a random letter down and then went on exploring until it found enough
                    neighboring nodes to write the full word
                </li>
                <li> Rinse and Repeat for all the rest of the words</li>
                <li>If I ran into an impossible state, I would go back to step 3, and if it was impossible after a set # of times, go back to step 1</li>
                <li>Generally it is always possible. This is due to some of the limitations I placed on my algorithm</li>
            </ol>

            <p>Here are some things I am considering improving</p>
            <ol>
                <li>Make it harder! Due to my BFS, a lot of the paths do not vary much from straight lines</li>
                <li>Add Diagonals: All my puzzles only allow/generate horizontal or vertical movements so adding diagonals would be a big plus 
                    (instead of strands I made more "tiles")
                </li>
                <li>Varying input size: I would love to add more or less words for each puzzle. This would also require using an O(2^n) algorithm
                    (despite smaller datasets it would still be a lot). Since this was a week long project I thought I would save this for later
                </li>
                <li>Add Mobile support: This is probably first on my list, right now since im using MouseUp and MouseDown, it does not work at all on mobile</li>
            </ol>
            <p>Here are some future expansions I could make</p>
            <ol>
                <li>Library of public games</li>
                <li>Rank games by difficulty (give each word a difficulty score based on variance from a line then sum up)</li>
            </ol>
        </>
    )
}
export default About;