import React, {useState} from 'react';
import styled from "styled-components";
import { useForm } from 'react-hook-form';
import useSWR, { useSWRConfig } from 'swr';

const fetcher = (url: string) => fetch(url).then(r => r.json());

interface Person {
    name: string;
    url: string;
}

interface Post {
    title: string;
    body: string;
}

const ButtonContainer = styled.div`
  display: flex;
  padding: 20px;
  
  & > button:not(:last-child) {
    margin-right: 10px;
  }
`

const Card = styled.div`
  margin: 50px;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 5px;
`

const CardTitle = styled.h3``

const CardText = styled.p``


const FormWrapper = styled.div`
  width: 30%;
  min-width: 250px;
  margin: 0 auto;
`

const HeroText = styled.p`
  text-align: center;
  font-size: 3rem;
`

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100px;
`

const Input = styled.input`
  padding: 7px 15px;
  border: 1px solid #eee;
  border-radius: 5px;
  margin: 10px 0;
`

const SubmitButton = styled.button`
  padding: 5px 10px;
  background-color: #eee;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  transition: .3s;
  
  &:hover {
    background-color: #ddd;
  }
`

const updateFn = (post: Post) =>
    fetch(`https://jsonplaceholder.typicode.com/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    })
        .then(res => res.json())

const Swr = () => {
    const [personNumber, setPersonNumber] = useState(1);

    const { data, error } = useSWR<Person, Error>(`https://swapi.dev/api/people/${personNumber}`, fetcher);

    const { mutate } = useSWRConfig();

    const { register, handleSubmit } = useForm<Post>();

    const submit = (data: Post) => {
        mutate('https://jsonplaceholder.typicode.com/posts', updateFn(data))
            .then(data => alert(JSON.stringify(data)));
    }

    const nextPerson = () => setPersonNumber(prev => prev + 1);
    const prevPerson = () => setPersonNumber(prev => prev - 1);


    return (
        <>
            <h2>SWR</h2>
            <ButtonContainer>
                <button disabled={personNumber === 1} onClick={prevPerson}>Previous Person</button>
                <button disabled={personNumber === 17} onClick={nextPerson}>Next Person</button>
            </ButtonContainer>

            {error && <Card><h3>Error: {error.message}</h3></Card>}
            {!data && <Card><h3>Loading...</h3></Card>}

            {
                data && (
                    <Card>
                        <CardTitle>{data.name}</CardTitle>
                        <CardText>{data.url}</CardText>
                    </Card>
                )
            }

            <FormWrapper>
                <HeroText>Create post</HeroText>
                <form onSubmit={handleSubmit(submit)}>
                    <FieldContainer>
                        <label htmlFor="title">Title</label>
                        <Input
                            {...register('title', { required: true })}
                            placeholder='Title'
                            name='title'
                        />
                    </FieldContainer>
                    <FieldContainer>
                        <label htmlFor="body">Body</label>
                        <Input
                            {...register('body', { required: true })}
                            placeholder='Body'
                            name='body'
                        />
                    </FieldContainer>
                    <SubmitButton type="submit">Send</SubmitButton>
                </form>
            </FormWrapper>
        </>
    )
}

export { Swr };
