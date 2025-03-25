

import React from 'react'

const TestComponent = () => {

    let data = [
        {
            title : "Section 375",
            author : "Chetan",
            price : 345,
            cat : "Drama"
        },
        {
            title : "13 B",
            author : "Parvesh ",
            price : 342,
            cat : "Action"
        },
        {
            title : "The boy in pajama",
            author : "Ronit",
            price : 341,
            cat : "Sportss"
        }
    ]

    return (
        <div className='m-5 border border-red-600 rounded-lg'>
            <table className='table-auto w-full overflow-auto'>
                <thead className='text-violet-700 border-b'>
                    <tr>
                        <th className="p-3 text-left">SNo</th>
                        <th className="p-3 text-left">Wide</th>
                        <th className="p-3 text-left">Runs</th>
                        <th className="p-3 text-left">Avg</th>
                    </tr>
                </thead>
                <tbody className=''>
                    {data.map((val, idx) => (
                        <tr key={idx}>
                            <td className="p-4">{val.title}</td>
                            <td className="p-4">{val.author}</td>
                            <td className="p-4">{val.price}</td>
                            <td className="p-4">{val.cat}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TestComponent
