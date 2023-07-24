import DownloadGame from "./download";
import Trailer from "./trailer";
import Map from "./map";
import Sect from "./sect";

function Home() {
    return(
        <>
            <Trailer /> 
            <Sect />
            <Map />
            <DownloadGame />
        </>
    );
}

export default Home;