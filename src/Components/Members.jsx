import React from 'react'
import MemberCard from './MemberCard'

/**
 * 
 * @param {
 * member={props.member}
 * } props 
 * @returns 
 */
const Members = (props) => {
    return (
        <div className='w-full h-auto gap-3 mt-4 flex flex-wrap bg-transparent'>
            {
                props.member.map((mem, index) => {
                    return <MemberCard
                        member={mem}
                        key={index}
                    />
                })
            }
        </div>
    )
}

export default Members
