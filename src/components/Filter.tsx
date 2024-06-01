'use client'

import { Divider, Radio, RadioGroup, Select, SelectItem, Slider } from '@nextui-org/react'
import { FilterIcon, Trash2 } from 'lucide-react'
import React, { useState } from 'react'

const Filter = () => {

    const [filter, setFilter] = useState('')


    return (
        <div className='bg-zinc-100 shadow-lg p-6 gap-6 flex flex-col w-full h-fit sticky top-20'>

            <div className='flex justify-between'>
                <h3 className='text-xl flex gap-2 font-semibold items-center'>Filter {<FilterIcon size={16}></FilterIcon>}</h3>

                <button className='text-xs flex gap-1 items-center'>Reset Filters {<Trash2 size={12}></Trash2>}</button>
            </div>

            <div className='flex flex-col gap-4'>

                <Select label="Category" color='default' size='sm' className='shadow-sm'>

                    <SelectItem key={1} value="all">All</SelectItem>
                    <SelectItem key={2} value="electrician">Electrician</SelectItem>
                    <SelectItem key={3} value="plumber">Plumber</SelectItem>
                    <SelectItem key={4} value="carpenter">Carpenter</SelectItem>

                </Select>
                <Divider />

                <Select label='Sort' color='default' size='sm' className='shadow-sm'>
                    <SelectItem key={1} value="all">All</SelectItem>
                    <SelectItem key={2} value="oldest">Oldest</SelectItem>
                    <SelectItem key={3} value="newest">Newest</SelectItem>
                    <SelectItem key={4} value="bestrated">Best rated</SelectItem>
                    <SelectItem key={5} value="worstrated">Worst rated</SelectItem>
                    <SelectItem key={6} value="verifiedonly">Verified only</SelectItem>

                </Select>

                <Divider />

                <Select label='City' color='default' size='sm' className='shadow-sm'>

                    <SelectItem key={1} value="all">All</SelectItem>
                    <SelectItem key={2} value="buenos-aires">Buenos Aires</SelectItem>
                    <SelectItem key={3} value="cordoba">Cordoba</SelectItem>
                    <SelectItem key={4} value="la-pampa">La Pampa</SelectItem>
                    <SelectItem key={5} value="mendoza">Mendoza</SelectItem>
                    <SelectItem key={6} value="santa-fe">Santa Fe</SelectItem>
                    <SelectItem key={7} value="tucuman">Tucuman</SelectItem>

                </Select>

                <Divider />


                <RadioGroup label="Currency">

                    <Radio value='usd'>USD</Radio>
                    <Radio value='ars'>ARS</Radio>
                </RadioGroup>

                <Divider />


                <Slider
                    label="Price Range"
                    step={50}
                    size='sm'
                    minValue={0}
                    maxValue={100000}
                    defaultValue={[0, 100000]}
                    formatOptions={{ style: "currency", currency: "ars" }}
                    color='success'
                    className="max-w-md"
                />
            </div>
        </div>
    )
}

export default Filter