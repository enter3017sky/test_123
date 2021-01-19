import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import actions from '../../actions/index'
import SearchBar from './SearchBar'
import './header.css'
import { FETCH_PRODUCTS } from '../../constants/types'

const Header = (props) => {
    // 故意這樣寫的，模擬loading的感覺
    useEffect(() => {
        props.fetchProducts().then(res => {
            setTimeout(() => {
                res.dispatch({ type: FETCH_PRODUCTS, payload: res.resData.data })
                props.loadingAction(false)
            }, 3000)
        })
    }, [])

    const renderHeader = () => {
        return props.products.map(product => {
            return (
                <Link to={`/detail/${product.id}`} className="two wide column item" key={product.id}>{product.title}</Link>
            )
        })
    }

    return (
        <div className="ui secondary massive menu">
            <Link to={'/'} className="blockSize">
                <img alt=""
                    src="https://campfireaudio.com/wp-content/uploads/2016/05/cropped-admin-ajax.png"
                    className="logo"
                />
            </Link>
            <div className="ui grid container">
                <div className="ui secondary menu">
                    <Link to={'/shop'} className="two wide column item">Shop</Link>
                    {renderHeader()}
                    <div className="right menu">
                        <div className="item">
                            <SearchBar />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return { products: Object.values(state.products) }
}

export default connect(mapStateToProps, actions)(Header)