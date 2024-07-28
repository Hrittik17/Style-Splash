import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrwnLogo } from '../../../assets/logo.svg';
import './navigation-component.scss';
import '../navigation/navigation-component.scss'
import CartIcon from '../../cart-icon/cart-icon-component';
import CartDropdown from '../../cart-dropdown/cart-dropdown-component';
import { UserContext } from "../../../contexts/user-context";
import { CartContext } from "../../../contexts/cart-context";
import { SignoutUsers } from '../../utils/firebase/firebase-utils';


const Navigation = () => {
    const { currentUsers } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext)

    // const signOutHandler = async () => {
    //    await SignoutUsers();
    //     setcurrentUsers(null);   
    // };

    return (
        <Fragment>
            <div className='navigation'>
                <Link className='logo-container' to='/'>
                    <CrwnLogo className='logo' />
                </Link>
                <div className='nav-links-container'>
                    <Link className='nav-link' to='/shop'>
                        SHOP
                    </Link>
                    {
                        currentUsers ? (
                            <span className="nav-link" onClick={SignoutUsers}>Sign Out</span>
                        ) : (
                            <Link className='nav-link' to='/auth'>
                                SIGN IN
                            </Link>
                        )
                    }
                    {
                        currentUsers && <Link className='nav-link' to='/checkout'>CheckOut</Link>
                    }
                    <CartIcon />
                </div>
            </div>
            {isCartOpen && <CartDropdown />}
            <Outlet />
        </Fragment>
    );
};

export default Navigation;

