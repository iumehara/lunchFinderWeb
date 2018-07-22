// @flow
import React from 'react'
import type {CategoryType} from './CategoryTypes'

type Props = {
  newCategory: CategoryType,
  fetchCategories: () => {},
  onNameChange: (event:  SyntheticEvent<HTMLButtonElement>) => {},
  resetForm: () => {},
  createNewCategory: (newCategory: CategoryType) => {},
  toggleNewCategoryMode: () => {}
}

class NewCategory extends React.Component<Props> {
  componentDidMount() {
    this.props.resetForm()
  }

  onButtonClick() {
    this.props.createNewCategory(this.props.newCategory)
  }

  onInputChange(event: SyntheticEvent<HTMLButtonElement>) {
    if (this.props.formError) {
      this.props.resetForm()
    }
    this.props.onNameChange(event)
  }

  renderFormError() {
    if (this.props.formError) {
      return <div className='error'>{this.props.newCategory.name} is already taken</div>
    }
  }

  render() {
    return (
      <div className='modal category'>
        <div className='title-bar'>
          <div className='title'>New Category</div>
          <div className='close' onClick={this.props.toggleNewCategoryMode}>☓</div>
        </div>
        <div className='form'>
          {this.renderFormError()}
          <div className='name'>
            <input onChange={this.onInputChange.bind(this)} placeholder='name'/>
          </div>
          <button className='save' onClick={this.onButtonClick.bind(this)}>create</button>
        </div>
      </div>
    )
  }
}

export default NewCategory
