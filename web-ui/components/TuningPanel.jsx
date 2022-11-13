import React from 'react'
import { useTuning } from '../context/TuningContext'

const TuningPanel = () => {
    const { filter, setFilter, sort, setSort } = useTuning()
  return (
    <div className='flex items-center w-full'>
        <label htmlFor="filter" className="text-sm font-medium text-gray-700 dark:text-gray-200">filter :</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} id="filter" className="ml-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block grow p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option value="last-hour">Last Hour</option>
        <option value="last-day">Last Day</option>
        <option value="last-week">Last Week</option>
        <option value="last-month">Last Month</option>
        <option value="last-year">Last Year</option>
        <option value="all-time">All</option>
        </select>
    </div>
  )
}

export default TuningPanel
