import React from 'react'
import { Helmet } from 'react-helmet'
const Metadata = ({title})  => {
  return (
    <Helmet>
            <title>{`${title} - AMBAY`}</title>
        </Helmet>
  )
}

export default Metadata