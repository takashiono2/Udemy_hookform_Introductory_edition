import { NextPage } from 'next';
import { useState } from 'react';
import { httpClient } from '@/lib/api/apibase';

import Button from '@/components/common/parts/Button';
import Container from '@/components/common/parts/Container';

const Page: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async() =>{
    let isSuccess = true;

    setLoading(true);
    try{
      await httpClient({
        method: 'post',
        url: 'api/form/01',
        data:{
          name,
          email,
          password,
        },
        headers: {
          'Content-type': 'application/json',
        }
      });
    }catch(error){
      window.alert('送信が失敗しました');
      isSuccess = false;
    }
    setLoading(false);

    if(isSuccess){
      window.alert('送信が成功しました');
    }
  };

  return (
  <Container maxWidth="max-w-4xl">
    <div className='mt-8'>
      <div className='mb-3 mt-8'>
        <label htmlFor="name">名前</label>
        <input
        id='name'
        type="text"
        placeholder="名前"
        className='w-full rounded border px-4 py-3 text-input placeholder:text-theme-light'
        onChange ={(e)=>setName(e.target.value)}
        value={name}
        />
      </div>
      <div className='mb-3 mt-8'>
        <label htmlFor="email">メールアドレス</label>
        <input
        id='email'
        type="text"
        placeholder="メールアドレス"
        className='w-full rounded border px-4 py-3 text-input placeholder:text-theme-light'
        onChange ={(e)=>setEmail(e.target.value)}
        value={email}
        />
      </div>
      <div className='mb-3 mt-8'>
        <label htmlFor="password">パスワード</label>
        <input
        id='password'
        type="text"
        placeholder="パスワード"
        className='w-full rounded border px-4 py-3 text-input placeholder:text-theme-light'
        onChange ={(e)=>setPassword(e.target.value)}
        value={password}
        />
      </div>
      <Button label="送信" variant="primary" onClick={onSubmit} loading={loading}/>
    </div>
  </Container>
  );
};
export default Page;
