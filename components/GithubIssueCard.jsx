import moment from 'moment'
import React from 'react'
import Link from 'next/link'
import { UserIcon } from '.'
import BoostButton from './BoostButton'

const GithubIssueCard = (props) => {
    const { txid } = props
    const {issue, organization, repository, sender} = props.content
    

    const handleComment = (e) => {
      e.preventDefault()
      window.open(issue.html_url)
    }
  return (
    <div className='grid grid-cols-12 bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 hover:dark:bg-gray-500 mt-0.5 first:rounded-t-lg'>
        <div className='col-span-12 flex items-center '>
            {/* <p className='p-4 text-sm italic text-gray-500 hover:underline'><a target="_blank" rel="noreferrer" href={repository.html_url}>{organization.login} /{repository.name}</a></p> */}
            <p className='p-4 text-sm italic text-gray-500'>
              <Link href={`/org/${organization.login}`}>
                <span className='hover:underline cursor-pointer'>{organization.login}</span>
              </Link>
              <span className='mx-1'>/</span>
              <Link href={`/org/${organization.login}/${repository.name}`}>
                <span className='hover:underline cursor-pointer'>{repository.name}</span>
              </Link>
            </p>
        </div>
        <div className='col-span-12'>
            <div className='mb-0.5 px-4 pt-4 pb-1 grid items-start grid-cols-12 max-w-screen cursor-pointer'>
                <div className='col-span-1'>
                    <a>
                        <UserIcon src={sender.avatar_url} size={46}/>
                    </a>
                </div>
                <div className='col-span-11 ml-6'>
                    <div className='flex'>
                        <a target="_blank" rel='noreferrer' href={sender.html_url} className='text-base leading-4 font-bold text-gray-900 dark:text-white cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis	hover:underline'>
                            {sender.login}
                        </a>
                        <div className='grow'/>
                        <a target="_blank" rel="noreferrer" href={issue.html_url} className='text-xs leading-5 whitespace-nowrap text-gray-500 dark:text-gray-300 hover:text-gray-700 hover:dark:text-gray-500'>
                            {moment(issue.created_at).fromNow()}
                        </a>
                    </div>
                    <div className='mt-1 text-gray-900 dark:text-white text-base leading-6 whitespace-pre-line break-words'>
                        {issue.body}
                    </div>
                    <div className='ml-1'>
                <div className='grid grid-cols-12 gap-4 w-full'>
                  <div className='col-span-5'/>
                  <div onClick={handleComment} className='col-span-3 flex group items-center w-fit relative'>
                    <svg
                      viewBox="0 0 40 40"
                      fill="none"
                      className="h-[40px] w-[40px] fill-gray-500 dark:fill-gray-300 group-hover:fill-green-500"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M16.7698 26.04L16.7796 26.0214C16.8013 25.98 16.8245 25.9351 16.8491 25.8873C17.03 25.5371 17.2911 25.0314 17.6274 24.6275C18.0608 24.1068 18.7281 23.6137 19.6907 23.6137C22.7525 23.6137 24.8033 23.173 26.0492 22.4503C27.1805 21.794 27.7035 20.8819 27.7035 19.5258C27.7035 16.3261 24.3811 13.2965 19.6907 13.2965C15.2771 13.2965 12.2965 16.1275 12.2965 19.5258C12.2965 20.3629 12.6319 22.2529 13.4911 23.5026L13.4978 23.5125L13.4978 23.5125C14.3586 24.7897 15.3301 25.7902 16.4883 26.5864C16.5026 26.5622 16.5179 26.5356 16.5341 26.5064C16.6042 26.3801 16.6748 26.2365 16.7606 26.059L16.7698 26.04ZM17.9278 26.6233C17.9537 26.574 17.9795 26.5244 18.0053 26.4748C18.4108 25.6944 18.8183 24.9101 19.6907 24.9101C25.9691 24.9101 29 23.1358 29 19.5258C29 15.3652 24.8247 12 19.6907 12C14.7423 12 11 15.2428 11 19.5258C11 20.5354 11.3711 22.7075 12.4227 24.2371C13.4124 25.7055 14.5567 26.8681 15.9485 27.7858C16.1649 27.9388 16.3814 28 16.5979 28C17.2474 28 17.5876 27.327 17.9278 26.6233Z"
                      ></path>
                    </svg>
                    <p className="text-gray-500 dark:text-gray-300 group-hover:text-green-500">
                        {issue.comments}
                      </p>
                  </div>
                  <BoostButton tx_id={txid} difficulty={0}/>
                </div>
              </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default GithubIssueCard