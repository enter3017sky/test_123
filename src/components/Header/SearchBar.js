import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import history from '../../utils/history'
import actions from '../../actions/index'
import _ from 'lodash'

const SearchBar = (props) => {
    const [keyWord, setKeyWord] = useState('')
    
    useEffect(() => {
        searchShow(props.products, keyWord)
    }, [keyWord])

    const onSubmit = (e) => {
        e.preventDefault()
        searchShow(props.products, keyWord)
        history.push('/shop/search')
    }


    const handleCompositionStart = event => {
        console.log(1, event)
    }

    const handleKeyup = event => {
        console.log(888, event)
    }

    const onCompositionEnd = event => {
        console.log(9, event)
    }

    const handlerKeyWord = event => {

        console.log(' event => ' , event)
        setKeyWord(event.target.value)
    }

    const searchShow = (products, keyWord) => {
        // console.log('%c products, keyWord ', 'font-weight: bold; color: white; background: blue;', products, keyWord)
        props.loadingAction(true)
        if (keyWord === '') {
            props.fetchSearchProducts({finalData: [], keyWord: ''})
            return
        }
        
        const reg = new RegExp(keyWord, "i")
        const searchData = products.map(data => {
                let arrayData = Object.values(data)

                // console.log('  arrayData  ', arrayData)
                if (reg.test(arrayData)) return data
                return null
            })

            // console.log(' searchData ', searchData)
            const finalData = _.filter(searchData, null)
            
            console.log(' finalData ', finalData)
        const dataObj = {finalData, keyWord}
        props.fetchSearchProducts(dataObj)
        history.push('/shop/search')
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="ui icon input">
                <input
                    type="text"
                    placeholder="Search..."
                    onCompositionStart={handleCompositionStart}
                    onKeyUp={handleKeyup}
                    onCompositionEnd={onCompositionEnd}
                    onChange={handlerKeyWord} />
                <i className="search link icon" onClick={onSubmit}></i>
            </div>
        </form>
    )
}

const mapStateToProps = (state) => {
    return { products: Object.values(state.products) }
}

export default connect(mapStateToProps, actions)(SearchBar)