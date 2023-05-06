import './rank.scss';

function RankLayout( { children } ) {
    return(
        <>
            <main className='ranking-layout-container'> { children } </main>
        </>
    );
}

export default RankLayout;