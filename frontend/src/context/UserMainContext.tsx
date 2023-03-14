import * as React from 'react';
import { createContext, useState, FC, useEffect } from 'react'

interface ISearchQuery {
    page: number | undefined,
    pageSize: number | undefined,
    minPrice: number | undefined,
    maxPrice: number | undefined,
    supplyId: number | undefined,
    deviceType: number | undefined,
    branch: string | undefined,
    searchString: string | undefined,
    orderBy: string | undefined,
    orderField: string | undefined
}
interface IUserMainContext {
    searchQuery: ISearchQuery,
    setUserMainContext?: ()=> void,
    setUserMainData?:  (searchQuery: ISearchQuery)=> void,
    clearUserMainData?:  ()=> void
}

const defaultUserMainContext: IUserMainContext = {
    searchQuery : {
        page: 1,
        pageSize: 20,
        minPrice: 0,
        maxPrice: 1000000000000000,
        supplyId: 0,
        deviceType: 1,
        branch: '',
        searchString: '',
        orderBy: 'ASC',
        orderField: 'name'
    }
};

export const UserMainContext = createContext<IUserMainContext>(defaultUserMainContext);

export const UserMainProvider: FC<any> = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState<ISearchQuery>(localStorage.getItem('searchQuery') ? JSON.parse(localStorage.getItem('searchQuery')!) :  {
        page: 1,
        pageSize: 20,
        minPrice: 0,
        maxPrice: 1000000000000000,
        supplyId: 0,
        deviceType: 1,
        branch: '',
        searchString: '',
        orderBy: 'ASC',
        orderField: 'name'
    });

    const setUserMainContext = () => {
        localStorage.setItem('searchQuery',JSON.stringify( {
            page: 1,
            pageSize: 20,
            minPrice: 0,
            maxPrice: 1000000000000000,
            supplyId: 0,
            deviceType: 1,
            branch: '',
            searchString: '',
            orderBy: 'ASC',
            orderField: 'name'
        }) )
        setSearchQuery(localStorage.getItem('searchQuery') ? JSON.parse(localStorage.getItem('searchQuery')!) : {
            page: 1,
            pageSize: 20,
            minPrice: 0,
            maxPrice: 1000000000000000,
            supplyId: 0,
            deviceType: 1,
            branch: '',
            searchString: '',
            orderBy: 'ASC',
            orderField: 'name'
        })
    }
    useEffect(() => {
        setSearchQuery(localStorage.getItem('searchQuery') ? JSON.parse(localStorage.getItem('searchQuery')!) : null)
    }, []);

    const setUserMainData = (searchQuery: ISearchQuery) => {
        localStorage.setItem('searchQuery',JSON.stringify(searchQuery) )
        setSearchQuery(searchQuery)
    }

    const clearUserMainData = () => {
        localStorage.setItem('searchQuery',JSON.stringify({
            page: 1,
            pageSize: 20,
            minPrice: 0,
            maxPrice: 1000000000000000,
            supplyId: 0,
            deviceType: 1,
            branch: '',
            searchString: '',
            orderBy: 'ASC',
            orderField: 'name'
        }) )
        setSearchQuery( {
            page: 1,
            pageSize: 20,
            minPrice: 0,
            maxPrice: 1000000000000000,
            supplyId: 0,
            deviceType: 1,
            branch: '',
            searchString: '',
            orderBy: 'ASC',
            orderField: 'name'
        })
    }

    const contextData = {
        searchQuery,
        setUserMainContext,
        setUserMainData,
        clearUserMainData
    };

    return <UserMainContext.Provider value={contextData}>{children}</UserMainContext.Provider>;
};
