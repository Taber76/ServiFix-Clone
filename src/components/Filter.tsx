// @ts-nocheck

'use client'

import useFilterPosts from '@/hooks/useFilterPosts'
import { Checkbox, CheckboxGroup, Divider, Radio, RadioGroup, Select, SelectItem, Slider } from '@nextui-org/react'
import { FilterIcon, Trash2 } from 'lucide-react'
//import { posts } from '@/lib/data'
import { useEffect } from 'react'
import SelectionSkeleton from './SelectionSkeleton'
import { useStore } from '@/store/serviceStore'
import { AllServices, getAllServices } from '@/services/getAllServices'
import allCities from '@/../public/data/cities.json'

const Filter: React.FC = () => {
    const { services, setServices } = useStore(state => ({
        services: state.services,
        setServices: state.setServices
    }));

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const data = await getAllServices();
                if (data) setServices(data);
            } catch (error) {
                console.error('Failed to fetch services:', error);
            }
        };

        fetchServices();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { filterConfig, setFilterConfig } = useFilterPosts();

    //const newCity = new Set(allPosts.map(post => post.city_name))
    //const allCities = Array.from(newCity)

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value
        setFilterConfig({
            ...filterConfig,
            category: value
        })
    }

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value
        setFilterConfig({
            ...filterConfig,
            sort: value
        })
    }

    const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value
        setFilterConfig({
            ...filterConfig,
            city: value
        })
    }

    const handleCurrencyChange = (e: string) => {
        setFilterConfig({
            ...filterConfig,
            currency: e
        })

    }

    const handlePriceChange = (e: number | number[]) => {
        const value = Array.isArray(e) ? e : [e];
        setFilterConfig({
            ...filterConfig,
            priceRange: [value[0], value[1]]
        });
    }

    const handleResetFilters = () => {
        setFilterConfig({
            category: 'all',
            sort: 'all',
            city: 'all',
            currency: 'all',
            verifiedOnly: false,
            priceRange: [0, 100000]
        })
    }

    const handleVerifiedChange = (e: any) => {

        const isChecked = e[0] === ''

        setFilterConfig({
            ...filterConfig,
            verifiedOnly: isChecked
        })
    }


    return (
        <div className='bg-zinc-100 shadow-lg p-6 gap-6 flex flex-col w-full h-fit sticky top-20 max-w-xs'>

            <div className='flex justify-between'>
                <h3 className='text-xl flex gap-2 font-semibold items-center'>Filter {<FilterIcon size={16}></FilterIcon>}</h3>

                <button onClick={handleResetFilters} className='text-xs flex gap-1 items-center'>Reset Filters {<Trash2 size={12}></Trash2>}</button>
            </div>

            <div className='flex flex-col gap-4'>
                {
                    services.length === 0
                        ? <div className="w-full max-w-xs"><SelectionSkeleton /></div>
                        :
                        <Select label="Category" color='default' size='sm' defaultSelectedKeys={[filterConfig.category]} className='shadow-sm'
                            onChange={(e) => handleCategoryChange(e)} disallowEmptySelection>
                            <SelectItem key={'all'} value="all">All</SelectItem>
                            {
                                services.map((service: AllServices) => (
                                    <SelectItem
                                        key={service.name.toLowerCase().replaceAll(' ', '-')}
                                        value={service.name}>
                                        {service.name}
                                    </SelectItem>
                                ))
                            }
                        </Select>
                }

                <Divider />

                <Select label='Sort' color='default' size='sm' className='shadow-sm' value={filterConfig.sort} onChange={(e) => handleSortChange(e)} disallowEmptySelection defaultSelectedKeys={filterConfig.sort}>
                    <SelectItem key={'all'} value="all">All</SelectItem>
                    <SelectItem key={'oldest'} value="oldest">Oldest</SelectItem>
                    <SelectItem key={'newest'} value="newest">Newest</SelectItem>
                    <SelectItem key={'bestrated'} value="bestrated">Best rated</SelectItem>
                    <SelectItem key={'worstrated'} value="worstrated">Worst rated</SelectItem>
                </Select>

                <Divider />

                <Select label='City' color='default' size='sm' className='shadow-sm' onChange={(e) => handleCityChange(e)} disallowEmptySelection defaultSelectedKeys={filterConfig.city}>
                    <SelectItem key={'all'} value="all">All</SelectItem>
                    {
                        allCities.map((city) => (
                            <SelectItem
                                key={city.id}
                                value={city.name}>
                                {city.name}
                            </SelectItem>
                        ))
                    }
                </Select>

                <Divider />

                <CheckboxGroup label="Taskers type" onValueChange={(e) => handleVerifiedChange(e)}>
                    <Checkbox color='success'>Verified only</Checkbox>
                </CheckboxGroup>

                <Divider />


                <RadioGroup label="Currency" defaultValue={filterConfig.currency} onValueChange={(e) => handleCurrencyChange(e)} >

                    <Radio value='usd'>USD</Radio>
                    <Radio value='ars'>ARS</Radio>
                </RadioGroup>

                <Divider />
                {
                    filterConfig.currency === 'usd' ?
                        <Slider
                            label="Price Range"
                            step={1}
                            size='sm'
                            minValue={0}
                            maxValue={5000}
                            defaultValue={[0, 5000]}
                            formatOptions={{ style: "currency", currency: "usd" }}
                            color='success'
                            className="max-w-md"
                            value={filterConfig.priceRange}
                            onChange={(e) => handlePriceChange(e)}
                            onChangeEnd={(e) => handlePriceChange(e)}
                        /> : <Slider
                            label="Price Range"
                            step={50}
                            size='sm'
                            minValue={0}
                            maxValue={100000}
                            defaultValue={[0, 100000]}
                            formatOptions={{ style: "currency", currency: "ars" }}
                            color='success'
                            className="max-w-md"
                            value={filterConfig.priceRange}
                            onChange={(e) => handlePriceChange(e)}
                            onChangeEnd={(e) => handlePriceChange(e)}
                        />
                }
            </div>
        </div >
    )
}

export default Filter