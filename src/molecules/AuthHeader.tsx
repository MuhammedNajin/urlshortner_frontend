import React from "react"
import { Heading } from "../atoms/Heading"
import { Text } from "../atoms/Text"
import { AuthHeaderProps } from "../@types/props"


const AuthHeader:React.FC<AuthHeaderProps> = ({ heading, text}) => {
  return (
    <div>
      <Heading level={1} className="text-2xl font-bold flex items-center mb-2">
              <span className="text-green-600 mr-2">+</span>{heading}
            </Heading>
            <Text className="text-gray-600 mb-6">{text}</Text>
      
    </div>
  )
}

export default AuthHeader
