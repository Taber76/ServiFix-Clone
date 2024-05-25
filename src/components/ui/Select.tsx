'use client'

import React, { useEffect } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { type AllServices, getAllServices } from "@/services/getAllServices";
import { useStore } from "@/store/serviceStore";

const Select: React.FC = () => {
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

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="flex w-full justify-center flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                <Autocomplete
                    size={'lg'}
                    defaultItems={services}
                    label="Search a job"
                    className="max-w-xs"
                >
                    {(item: AllServices) => (
                        <AutocompleteItem key={item.id}>
                            {item.name}
                        </AutocompleteItem>
                    )}
                </Autocomplete>
            </div>
        </div>
    );
};

export default Select;
