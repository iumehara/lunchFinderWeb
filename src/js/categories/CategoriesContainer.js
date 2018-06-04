import {connect} from 'react-redux'
import Categories from './Categories'
import {fetchCategoriesThenDispatch, setDispatch} from '../actions'
import {createCategory} from '../fetchers/resourceFetcher'

export const mapStateToProps = (state) => ({
  newCategory: state.newCategory,
  formError: state.formError,
  categories: state.categories
})

export const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchCategories: () => fetchCategoriesThenDispatch(dispatch),

  onNameChange: e => setDispatch(e.target.value, 'SET_NEW_CATEGORY_NAME', dispatch),

  resetForm: () => dispatch({type: 'CREATE_CATEGORY_FAILURE', data: ''}),

  createNewCategory: newCategory => {
    createCategory(newCategory)
      .then(response => {
        if (response.id) {
          ownProps.history.push(`/categories/${response.id}`)
        } else if (response.error) {
          dispatch({type: 'CREATE_CATEGORY_FAILURE', data: response.error})
        }
      })
  }
})

const CategoriesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories)

export default CategoriesContainer
