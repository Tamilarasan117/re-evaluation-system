import React from 'react'

const SelectOption = (props) => {
  const { evaluator } = props
  
  return (
    <>
      <option value={ evaluator.username }>{ evaluator.username }</option>
    </>
  )
}

export default SelectOption