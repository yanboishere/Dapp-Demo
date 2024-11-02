'use client'

import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Coins, Wallet } from "lucide-react"

export default function Component() {
  const [coins, setCoins] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [walletAddress, setWalletAddress] = useState('')

  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window
      if (!ethereum) {
        console.log("Make sure you have MetaMask!")
        return
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' })
      if (accounts.length !== 0) {
        setWalletAddress(accounts[0])
      }
    } catch (error) {
      console.error(error)
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window
      if (!ethereum) {
        alert("Get MetaMask!")
        return
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" })
      setWalletAddress(accounts[0])
    } catch (error) {
      console.error(error)
    }
  }

  const earnCoin = () => {
    setCoins(prevCoins => prevCoins + 1)
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 500)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4">
      <div className="flex justify-end mb-4">
        <Button 
          onClick={connectWallet}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          {walletAddress ? `${walletAddress.slice(0,6)}...${walletAddress.slice(-4)}` : "连接钱包"}
        </Button>
      </div>
      <div className="flex-grow flex items-center justify-center">
        <Card className="w-[300px] relative overflow-hidden">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">点击赚金币</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-2 text-yellow-500">
              <Coins size={24} />
              <motion.span 
                key={coins}
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.2, 1] }}
                className="text-2xl font-bold"
              >
                {coins}
              </motion.span>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={earnCoin}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
                disabled={!walletAddress}
              >
                {walletAddress ? "点击赚取金币" : "请先连接钱包"}
              </Button>
            </motion.div>
          </CardContent>
          <AnimatePresence>
            {isAnimating && (
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: -50, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              >
                <Coins size={24} className="text-yellow-500" />
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </div>
    </div>
  )
}