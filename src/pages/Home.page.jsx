import React from 'react';

const SearchDefault = React.lazy(() => import('components/Search/SearchDefault.component.jsx'));

export default function Home() {

    return (
        <>
            <SearchDefault/>
        </>
    );
}