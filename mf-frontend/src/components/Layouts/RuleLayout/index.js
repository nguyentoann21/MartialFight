import React from 'react';
import './rules.scss';

function RuleLayout({ children }) {
    return(
        <>
            <main className='rule-layout-container'> { children } </main>
        </>
    );
}

export default RuleLayout;