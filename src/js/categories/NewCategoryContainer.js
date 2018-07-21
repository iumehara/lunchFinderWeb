import {connect} from 'react-redux'
import NewCategory from './NewCategory'
import {setDispatch} from '../actions'
import {createCategory} from '../fetchers/resourceFetcher'

const mapStateToProps = (state) => ({
  newCategory: state.newCategory,
  formError: state.formError,
  currentMode: state.currentMode
})

const mapDispatchToProps = (dispatch, ownProps) => ({
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
  },

  toggleNewCategoryMode: () => dispatch({type: 'TOGGLE_NEW_CATEGORY_MODE'})
})

const NewCategoryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewCategory)

export default NewCategoryContainer
