'use client';

import { Topic } from '@prisma/client';
import { Select, SelectItem } from "@heroui/react";

interface TopicSelectProps {
  defaultValue: string;
  topics: Topic[];
  onSelect: (value: string) => void;
}

export default function TopicSelect({ defaultValue, topics, onSelect }: TopicSelectProps) {
  return (
    <Select
      className="max-w-xs"
      label="Topic"
      labelPlacement="outside"
      placeholder='Select a topic'
      items={topics}
      defaultSelectedKeys={[defaultValue]}
      onChange={
        (e) => onSelect(e.target.value)
      }>
      {topics?.map((topic) => (
        <SelectItem key={topic.slug} value={topic.slug}>{topic.slug}</SelectItem>
      ))}
    </Select>
  );
}