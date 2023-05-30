import { DEFAULT_PAGE, PAGE_SIZE } from '../constants'
import { useState } from 'react'

export const usePagination = (allSuperheroesData) => {
    const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);
    const [superheroesPerPage] = useState(PAGE_SIZE);

    const lastSuperheroesIndex = currentPage * superheroesPerPage
    const firstSuperheroesIndex = lastSuperheroesIndex - superheroesPerPage

    const currentCourse = allSuperheroesData.slice(firstSuperheroesIndex, lastSuperheroesIndex);

    const paginate = (pageNumber) => {
        window.scrollTo(0,0)
        setCurrentPage(pageNumber)
    };

    return {
        currentCourse,
        paginate
    }
}