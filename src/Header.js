import { faKitchenSet} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'

const Header = () => {
  return (
    <header>
      <FontAwesomeIcon icon={faKitchenSet} className='logo'/>
      <h1>Chef Promigo</h1>
    </header>
  )
}

export default Header