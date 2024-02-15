import React, { useEffect, useState } from 'react'
import './navbar.scss';
import { KeyboardArrowDownOutlined, SearchOutlined, AddOutlined, DeleteOutlined } from '@mui/icons-material';
import Sidebar from './Sidebar';
import { Link, useNavigate } from 'react-router-dom';
import Sports from '../../assets/json/Sports.json'
import Logo from '../../assets/img/Logo.png'
import { useDispatch, useSelector } from 'react-redux';
import { AddCategory, RemoveCategory } from '../../functions/Category';
import { AddCategoryReducer, RemoveCategoryReducer } from '../../reducers/Category';
import { SelectSport } from '../../reducers/Index';

function Navbar() {

    const [isMenu, setIsMenu] = useState(false);
    const [dropdown, setDropdown] = useState('');
    const [category, setCategory] = useState("");
    const [isSearch, setIsSearch] = useState(false);
    const User = useSelector(state => state.User);
    const Category = useSelector(state => state.Category.category);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const VideoHandler = (e, category) => {
        e.preventDefault();
        navigate('/sport');
        dispatch(SelectSport({ selectedSport: category }));
        setDropdown(false);
    }

    const DropdownExiter = (e) => {
        let toggle = e.target.className;
        if (toggle === "background") setDropdown("");
    }

    const AddCategoryHandler = async (e) => {
        e.preventDefault();
        if (category.category.length < 3) return;
        await AddCategory(category);
        dispatch(AddCategoryReducer({ category: [...Category, category.category] }));
        setCategory({ category: "" });
    }

    const DeleteCategoryHandler = async (e, category) => {
        e.preventDefault();
        const del = { category: category };
        await RemoveCategory(del);
        dispatch(RemoveCategoryReducer({ category: [...Category.filter(cat => cat == category)] }));
    }

    const searchBar = (title) => {
        if (title == "def") {
            setIsSearch(true)
        }
        else {
            setIsSearch(false)
        }
    }

    return (
        <nav className='navbar'>
            {isSearch ? <div className='search-bar'>Defence is an art</div> : ""}
            <div>
                <div className='logo' onClick={() => setDropdown(false)}>
                    <Link className='link' to={'/'}><img src={Logo} /></Link>
                </div>
                <div className='list'>
                    <div>
                        <button className={(dropdown === "sports") ? "active" : ""} onClick={() => { setDropdown((dropdown === "sports" ? "" : "sports")) }}>Sports <KeyboardArrowDownOutlined className='icon' /></button>
                        <div className={(dropdown === "sports") ? "" : "hidden"}>
                            <div className='sport-list'>
                                {
                                    Category.length > 0 && Category.map((category, i) =>
                                        <div key={i}>
                                            <Link className='link' onClick={(e) => VideoHandler(e, category)}>{category}</Link>
                                            {User.isAdmin === "Yes"
                                                ?
                                                <button onClick={(e) => DeleteCategoryHandler(e, category)}><DeleteOutlined className='icon' /></button>
                                                :
                                                ""
                                            }
                                        </div>
                                    )
                                }
                                {
                                    User.isAdmin === "Yes"
                                        ?
                                        <form>
                                            <input placeholder='Add Sport' onChange={(e) => setCategory({ category: e.target.value })} value={category.category} /><button onClick={(e) => AddCategoryHandler(e)}><AddOutlined className='icon' /></button>
                                        </form>
                                        :
                                        ""
                                }
                            </div>
                            <div className='background' onClick={(e) => DropdownExiter(e)}></div>
                        </div>
                    </div>
                    <div>
                        <button onClick={() => { setDropdown("") }} >
                            <Link className='link' to='/live'>Live<KeyboardArrowDownOutlined className='icon' /></Link>
                        </button>
                    </div>
                </div>
                <div className='search'>
                    <input placeholder="What can we help you find?" onChange={(e) => searchBar(e.target.value)} />
                    <button>
                        <SearchOutlined className='icon' />
                    </button>
                </div>
                <div className='signin' >
                    <button onClick={() => { setDropdown(false); setIsMenu(true) }}>
                        <img alt="Account" src="https://target.scene7.com/is/content/Target/GUEST_459579d1-8996-4e3c-889a-a975f12c0fd4" />
                        {User.username ? User.username : "Sign in"}
                        <KeyboardArrowDownOutlined className='icon' />
                    </button>
                </div>
            </div >
            {
                isMenu ? <Sidebar setIsMenu={setIsMenu} /> : ''
            }
        </nav >
    )
}

export default Navbar