import React from "react";
import { Pressable, Text } from "react-native";


interface ContactsItemProps {
    name: string,
    onClick: () => void
}

const ContactsItem = ({ name, onClick }: ContactsItemProps) => {
    return (
        <Pressable onPress={onClick}>
            <Text style={{
                lineHeight: 32
            }}>{name}</Text>
        </Pressable>
    );
}

export default ContactsItem;