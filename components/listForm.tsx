import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from '@/styles/Form.module.css';
import * as yup from 'yup';
import { useMutation } from '@tanstack/react-query';

const schema = yup.object({
  slug: yup.string().required(),
}).required();

interface Restaurant {
  id: number;
  attributes: {
    name: string;
    email: string;
    slug: string;
  };
}

interface FormInput {
  slug: string;
}

const ListForm = () => {

  const [fetchedData, setFetchedData] = useState<Restaurant[] | null>(null);
  const [singleData, setSingleData] = useState<Restaurant | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await mutationFetchAll.mutateAsync();
        setFetchedData(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const mutationFetchAll = useMutation({
    mutationFn: async () => {
      const response = await fetch('https://helpful-crown-bf871e0d9a.strapiapp.com/api/restaurants/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return response.json();
    },
  });

  const mutationFetchData = useMutation({
    mutationFn: async (data: FormInput) => {
      const response = await fetch('https://helpful-crown-bf871e0d9a.strapiapp.com/api/restaurants/' + data.slug, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return response.json();
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const result = await mutationFetchData.mutateAsync(data);
      setSingleData(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <label>Slug</label>
        <input type="text" {...register("slug")} className={styles.inputGroup} />
        <div className={styles.error}>
          {errors.slug && <span>{errors.slug.message}</span>}
        </div>
        <button type="submit" className={styles.submit}>
          Submit
        </button>

        {mutationFetchData.isError && <div>Error: {mutationFetchData.error.message}</div>}
        {mutationFetchData.isSuccess && <div>Data fetched successfully!</div>}
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>ID</th>
              <th className={styles.th}>Name</th>
              <th className={styles.th}>Email</th>
              <th className={styles.th}>Slug</th>
            </tr>
          </thead>
          <tbody>
            {!singleData && fetchedData && fetchedData.map((restaurant: Restaurant) => (
              <tr key={restaurant.id}>
                <td className={styles.td}>{restaurant.id}</td>
                <td className={styles.td}>{restaurant.attributes.name}</td>
                <td className={styles.td}>{restaurant.attributes.email}</td>
                <td className={styles.td}>{restaurant.attributes.slug}</td>
              </tr>
            ))}
            {singleData && (
              <tr key={singleData.id}>
                <td className={styles.td}>{singleData.id}</td>
                <td className={styles.td}>{singleData.attributes.name}</td>
                <td className={styles.td}>{singleData.attributes.email}</td>
                <td className={styles.td}>{singleData.attributes.slug}</td>
              </tr>
            )}
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default ListForm;
