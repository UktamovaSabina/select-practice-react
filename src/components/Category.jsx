import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import './Category.css'

const Category = () => {
    const [categories, setCategories] = useState([]);
    const info = useRef();
    const selectOneOpt = useRef();

    useEffect(() => {
        axios('https://api.escuelajs.co/api/v1/categories')
            .then(response => setCategories(response.data))
            .catch(err => console.error(err))
    }, [])

    function selectedOpt(evt) {
            const selectedCategory = evt.target.value;
            categories.find(category => {
                if (category.name === selectedCategory) {
                    info.current.innerHTML = `<h2>${category.name}</h2>
                    <img width="400" src='${category.image}'/>`
                }
            })
            if (selectedCategory !== selectOneOpt) {
                selectOneOpt.current.disabled = true;
            }
        
    }

    return (
        <div>
            <select className='select' onChange={selectedOpt}>
                <option disabled={false} ref={selectOneOpt} value="select one">Select one</option>
                {
                    categories.map(category => {
                        return <option key={category.id} value={category.name}>
                            {category.name}
                        </option>
                    })
                }
            </select>
            <div ref={info} className="info">
                <h2>No datas</h2>
            </div>
        </div>
    )
}

export default Category