import React from 'react'
import MapComponent from '../Components/Maps/MapComponent'

const LoactionSelector = () => {

    const [loc, setloc] = React.useState([74.3501, 16.2229])

  return (
    <div className='my-3'>
        <MapComponent loc={loc} setLoc={setloc} />
    </div>
  )
}

export default LoactionSelector