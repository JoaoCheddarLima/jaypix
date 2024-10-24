"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Clock, Copy, CreditCard, User } from 'lucide-react'
import { Inter } from 'next/font/google'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })


function PixModal({ isOpen, onClose, title, cnpj, chaveAleatoria, chavePrivada }: {
    isOpen: boolean,
    onClose: () => void,
    title: string,
    cnpj?: string,
    chaveAleatoria?: string,
    chavePrivada?: string
}) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-yellow-400 border-2 border-black text-black rounded-lg shadow-xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-black text-black">{title}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 flex flex-col ">
                    {cnpj && (
                        <PixField label="CNPJ" value={cnpj} />
                    )}
                    {chaveAleatoria && (
                        <PixField label="Chave Aleatória" value={chaveAleatoria} />
                    )}
                    {chavePrivada && (
                        <PixField label="Chave Aleatória" value={chavePrivada} />
                    )}
                    {chavePrivada && (
                        <div className='w-full flex justify-center '>
                            <Image
                                src={`/qr_pix_pf.png`}
                                alt="QR Code"
                                width={256}
                                height={256}
                                className='p-2 bg-white shadow-lg rounded-lg'
                            />
                        </div >
                    )}
                    {
                        cnpj && (
                            <div className='w-full flex justify-center '>
                                <Image
                                    src={`/qr_pix_pj.png`}
                                    alt="QR Code"
                                    width={256}
                                    height={256}
                                    className='p-2 bg-white shadow-lg rounded-lg'
                                />
                            </div>
                        )
                    }
                </div>
            </DialogContent>
        </Dialog>
    )
}

function PixButton({ title, icon, onClick, variant = "primary" }: {
    title: string,
    icon: React.ReactNode,
    onClick: () => void,
    variant?: "primary" | "secondary"
}) {
    const baseClasses = "flex items-center justify-center space-x-3 px-6 py-4 rounded-lg font-bold text-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg"
    const variantClasses = variant === "primary"
        ? "bg-black text-yellow-400 hover:bg-gray-800"
        : "bg-purple-600 text-yellow-400 hover:bg-purple-700"

    return (
        <motion.button
            className={`${baseClasses} ${variantClasses}`}
            onClick={onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            {icon}
            <span>{title}</span>
        </motion.button>
    )
}

function PixField({ label, value }: {
    label: string,
    value: string
}) {
    const copyToClipboard = () => {
        navigator.clipboard.writeText(value)
    }

    return (
        <div>
            <Label htmlFor={label} className="text-black font-bold">{label}:</Label>
            <div className="flex mt-1">
                <Input id={label} value={value} readOnly className="bg-white text-black border-black" />
                <Button onClick={copyToClipboard} className="ml-2 bg-black hover:bg-gray-800 text-yellow-400 rounded-full">
                    <Copy className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}


export default function CodigosPix() {
    const [isServiceModalOpen, setIsServiceModalOpen] = useState(false)
    const [isPersonalModalOpen, setIsPersonalModalOpen] = useState(false)
    const [currentTime, setCurrentTime] = useState(new Date())

    const cnpj = "57817708000157"
    const cnpjText = "57.817.708/0001-57"
    const chaveAleatoria = "3a51f1be-921f-467c-9702-5861a6b12815"
    const chavePrivada = "19d3c380-90ce-478e-95d4-a856ed8023e7"

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString()
    }

    return (
        <div className={`${inter.className} bg-yellow-400 min-h-screen flex flex-col`}>
            <div className="bg-red-600 p-4 text-white text-center font-bold flex items-center justify-center">
                <Clock className="mr-2" />
                <span>{formatTime(currentTime)}</span>
                <span className="ml-2">Horário atual!</span>
            </div>
            <header className="bg-black bg-opacity-30 p-4 text-white font-bold flex flex-col items-center justify-between">
                <div className="flex items-center space-x-4">
                    <motion.div
                        className="w-12 h-12 rounded-full overflow-hidden border-2 border-yellow-400"
                        whileHover={{ scale: 1.2 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                        <Image
                            src="/eu_pfp.png"
                            alt="Perfil"
                            width={64}
                            height={64}
                            objectFit="cover"
                        />
                    </motion.div>
                    <span className="text-lg">Chaves PIX do João</span>
                </div>
            </header>

            <main className="flex-grow flex flex-col items-center justify-center p-8 text-black">
                <motion.h1
                    className="text-4xl md:text-6xl font-black mb-8 text-center text-black"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    MUITO OBRIGADO PELA PREFERÊNCIA, VOCÊ HACKEOU MEU CORAÇÃO
                </motion.h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
                    <PixButton
                        title="Te prestei algum serviço? Clica aqui"
                        icon={<CreditCard className="w-6 h-6" />}
                        onClick={() => setIsServiceModalOpen(true)}
                    />
                    <PixButton
                        title="PIX pessoal clica aqui"
                        icon={<User className="w-6 h-6" />}
                        onClick={() => setIsPersonalModalOpen(true)}
                        variant="secondary"
                    />
                </div>

                <motion.p
                    className="mt-12 text-lg text-center max-w-2xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    Você esta prestes a fidelizar nossa relação, onde seus sonhos e ideias se tornam realidade, e seu programador favorito fica mais calvo.
                </motion.p>
            </main>

            <footer className="bg-black bg-opacity-50 text-white py-4 px-4 text-center">
                <p className="mb-2">CNPJ: {cnpjText}</p>
                <p className="text-sm opacity-75">
                    Os textos desta podem página conter elementos de humor.
                </p>
            </footer>

            <PixModal
                isOpen={isServiceModalOpen}
                onClose={() => setIsServiceModalOpen(false)}
                title="Chaves PIX para Serviços"
                cnpj={cnpj}
                chaveAleatoria={chaveAleatoria}
            />

            <PixModal
                isOpen={isPersonalModalOpen}
                onClose={() => setIsPersonalModalOpen(false)}
                title="Chave PIX Pessoal"
                chavePrivada={chavePrivada}
            />
        </div>
    )
}