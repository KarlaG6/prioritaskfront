'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getCategoriesService, createCategoryService, updateCategoryService, deleteCategoryService } from '@/services/categories.service';


const CategoriesContext = createContext<any>(undefined);


export function CategoriesProvider({ children }: { children: React.ReactNode }) {
const { token } = useAuth();
const [categories, setCategories] = useState<any[]>([]);


async function fetchCategories() { if (!token) return; const data = await getCategoriesService(token); setCategories(data); }
async function addCategory(body: any) { if (!token) return; const c = await createCategoryService(token, body); setCategories(prev => [c, ...prev]); }
async function editCategory(id: string, body: any) { if (!token) return; const u = await updateCategoryService(token, id, body); setCategories(prev => prev.map(p => p.id === id ? u : p)); }
async function removeCategory(id: string) { if (!token) return; await deleteCategoryService(token, id); setCategories(prev => prev.filter(p => p.id !== id)); }


useEffect(() => { fetchCategories(); }, [token]);


return <CategoriesContext.Provider value={{ categories, fetchCategories, addCategory, editCategory, removeCategory }}>{children}</CategoriesContext.Provider>;
}
export function useCategories() { const ctx = useContext(CategoriesContext); if (!ctx) throw new Error('useCategories must be inside CategoriesProvider'); return ctx; }