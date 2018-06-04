// @flow
import React from 'react'
import CategoryLink from './CategoryLink'
import type {CategoryType} from './CategoryTypes'

type Props = {
  categories: [CategoryType],
  newCategory: CategoryType,
  fetchCategories: () => {},
  onNameChange: (event:  SyntheticEvent<HTMLButtonElement>) => {},
  resetForm: () => {},
  createNewCategory: (newCategory: CategoryType) => {}
}

class Categories extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchCategories()
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
    const categories = this.props.categories.map((category, i) => {
      return <CategoryLink key={i} category={category}/>
    })

    return (
      <div>
        <h1 className='title'>Categories</h1>
        <ul>
          {categories}
        </ul>
        <div className='form'>
          <h1 className='title'>New Category</h1>
          {this.renderFormError()}
          <div className='name'>
            <label>name</label>
            <input onChange={this.onInputChange.bind(this)}/>
          </div>
          <button className='save' onClick={this.onButtonClick.bind(this)}>create</button>
        </div>
      </div>
    )
  }
}

export default Categories
