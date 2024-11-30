// importing packages
import React from 'react'

const SelectOption = ({ evaluator }) => {
  return (
    <>
      <option value={ evaluator.username }>{ evaluator.username }</option>
    </>
  )
}

export default SelectOption