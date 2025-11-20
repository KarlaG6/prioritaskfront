'use client';
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';


export default function RegisterPage() {
const { register } = useAuth();
const router = useRouter();
const [name,setName]=useState(''); const [email,setEmail]=useState(''); const [password,setPassword]=useState('');


async function onSubmit(e: React.FormEvent){ e.preventDefault(); await register(name,email,password); alert('Registrado, por favor inicia sesión'); router.push('/login'); }


return (
<div className="min-h-screen flex items-center justify-center">
<form onSubmit={onSubmit} className="w-full max-w-md p-6 bg-white rounded shadow">
<h1 className="text-2xl font-bold mb-4">Registro</h1>
<input className="input mb-2" placeholder="Nombre" value={name} onChange={e=>setName(e.target.value)} />
<input className="input mb-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
<input type="password" className="input mb-4" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
<button className="btn w-full">Crear cuenta</button>
</form>
</div>
);
}