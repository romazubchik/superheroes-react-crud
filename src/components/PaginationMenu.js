import Pagination from 'react-bootstrap/Pagination'
import { PAGE_SIZE } from '../constants'


const PaginationMenu = ({ totalSuperheroes, paginate }) => {

  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalSuperheroes / PAGE_SIZE); i++) {
    pageNumbers.push(i)
  }

  return (
    <Pagination className="d-flex justify-content-center mt-3" size="lg">
      {
        pageNumbers.map(number => (
          <Pagination.Item href={`#${number}`} key={number} onClick={() => paginate(number)}>
            {number}
          </Pagination.Item>
        ))
      }
    </Pagination>
  )
}

export default PaginationMenu;