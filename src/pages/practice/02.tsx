import { zodResolver } from '@hookform/resolvers/zod';
import { NextPage } from 'next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import Button from '@/components/common/parts/Button';
import Container from '@/components/common/parts/Container';
import { httpClient } from '@/lib/api/apibase';

const schema = z.object({
  name: z.string().min(1, '名前を入力してください').max(50, '50文字以内で入力してください'),
  email: z.string().email('正しいメールアドレスを入力してください'),
  password: z.string().min(8, 'パスワードは、8文字以上で入力してください').regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[\d!@#$%^&*()-_=+{};:',<.>/?[\]\\|]).+$/, '半角英数記号で入力し少なくとも1文字以上の大文字・小文字・記号を含めてください'),
});

type FormInput = z.infer<typeof schema>;

const DEFAULT_FROM_INPUT: FormInput = {
  name:'',
  email:'',
  password:'',
};

const Page: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { handleSubmit ,reset, register, formState:{ errors } } = useForm<FormInput>({
    resolver: zodResolver(schema),
    defaultValues: DEFAULT_FROM_INPUT, //フォームの初期値を設定
    // mode: 'onChange',
  });

  const onSubmit = async(data: FormInput) =>{
    const { name, email, password } = data;
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
      window.alert('送信が失敗しました');
      reset();
    }
  };

  return (
    <Container maxWidth="max-w-4xl">
      <div className="mb-3 mt-8">
        <label htmlFor="name">名前</label>
        <input
          id="name"
          type="text"
          placeholder="名前"
          className={`w-full rounded border px-4 py-2 text-input outline-none placeholder:text-theme-light focus:border-primary ${errors['name'] ? 'border-error' : 'border-theme-medium'}`}
          { ...register('name') }
        />
        {errors['name'] && (
          <div className="mt-1 text-body3 text-error">
            <span>{errors['name'].message}</span>
          </div>
        )}
      </div>

      <div className="mt-8">
        <label htmlFor="email">メールアドレス</label>
        <input
          id="email"
          type="text"
          placeholder="メールアドレス"
          className={`w-full rounded border px-4 py-2 text-input outline-none placeholder:text-theme-light focus:border-primary ${errors['email'] ? 'border-error' : 'border-theme-medium'}`}
          { ...register('email') }
        />
        {errors['email'] && (
          <div className="mt-1 text-body3 text-error">
            <span>{errors['email'].message}</span>
          </div>
        )}
      </div>

      <div className="mb-4 mt-8">
        <label htmlFor="password">パスワード</label>
        <input
          id="password"
          type="text"
          placeholder="パスワード"
          className={`w-full rounded border px-4 py-2 text-input outline-none placeholder:text-theme-light focus:border-primary ${errors['password'] ? 'border-error' : 'border-theme-medium'}`}
          { ...register('password') }
        />
        {errors['password'] && (
          <div className="mt-1 text-body3 text-error">
            <span>{errors['password'].message}</span>
          </div>
        )}
      </div>

      <Button onClick={ handleSubmit(onSubmit) } label="送信" variant="primary" loading={loading} />
    </Container>
  );
};

export default Page;
