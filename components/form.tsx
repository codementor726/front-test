import React from 'react';
import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import styles from "@/styles/Form.module.css";
import * as yup from "yup"
import { useMutation } from '@tanstack/react-query';

const schema = yup
  .object({
    firstName: yup.string().required(),
    email: yup.string().email().required(),
    ageGroup: yup.string().oneOf(['adult', 'child', 'infant']).required(),
    address: yup.string(),
  })
  .required()

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  
  const mutation = useMutation({
    mutationFn: async (formData) => {
      const response = await fetch('/api/hello', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
      return response.json();
    },
  })

  const onSubmit = async (data: any) => {
    try {
      await mutation.mutateAsync(data);
      console.log(data)
      // Handle success
    } catch (error) {
      console.log(error)
      // Handle error
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <label>FirstName</label>
        <input type="text" {...register("firstName")} className={styles.inputGroup}/>
        <div className={styles.error}>
          {errors.firstName && <span>{errors.firstName.message}</span>}
        </div>
        <label>Email</label>
        <input type="text" {...register("email")} className={styles.inputGroup}/>
        <div className={styles.error}>
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <label>AgeGroup</label>
        <select {...register("ageGroup")} className={styles.inputGroup}>
          <option value="adult">Adult</option>
          <option value="child">Child</option>
          <option value="infant">Infant</option>
        </select>
        <div className={styles.error}>
          {errors.ageGroup && <span>{errors.ageGroup.message}</span>}
        </div>
        <label>Address</label>
        <input type="text" {...register("address")} className={styles.inputGroup}/>

        <button type="submit" className={styles.submit}>
          Submit
        </button>
        
        {mutation.isError && <div>Error: {mutation.error.message}</div>}
        {mutation.isSuccess && <div>Form submitted successfully!</div>}
      </form>
    </div>
  )
}

export default Form;

