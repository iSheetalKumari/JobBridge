"use client";
import { useState } from "react";
import { Button, TextField, Select } from "@radix-ui/themes";

interface JobSearchFiltersProps {
  onSearch: (filters: JobFilters) => void;
}

export interface JobFilters {
  keyword: string;
  location: string;
  jobType: string;
  remoteType: string;
  salaryMin: string;
  salaryMax: string;
}

export default function JobSearchFilters({ onSearch }: JobSearchFiltersProps) {
  const [filters, setFilters] = useState<JobFilters>({
    keyword: "",
    location: "",
    jobType: "",
    remoteType: "",
    salaryMin: "",
    salaryMax: ""
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  const handleReset = () => {
    setFilters({
      keyword: "",
      location: "",
      jobType: "",
      remoteType: "",
      salaryMin: "",
      salaryMax: ""
    });
  };

  return (
    <form onSubmit={handleSearch} className="bg-white p-6 rounded-lg border border-gray-200 space-y-4">
      <h3 className="text-lg font-semibold mb-4">Search & Filter Jobs</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextField.Root
          placeholder="Job title or keyword..."
          value={filters.keyword}
          onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
        />

        <TextField.Root
          placeholder="Location"
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        />

        <Select.Root
          value={filters.jobType}
          onValueChange={(value) => setFilters({ ...filters, jobType: value })}
        >
          <Select.Trigger />
          <Select.Content>
            <Select.Item value="">All Job Types</Select.Item>
            <Select.Item value="full">Full-time</Select.Item>
            <Select.Item value="part">Part-time</Select.Item>
            <Select.Item value="contract">Contract</Select.Item>
            <Select.Item value="intern">Internship</Select.Item>
          </Select.Content>
        </Select.Root>

        <Select.Root
          value={filters.remoteType}
          onValueChange={(value) => setFilters({ ...filters, remoteType: value })}
        >
          <Select.Trigger />
          <Select.Content>
            <Select.Item value="">All Work Types</Select.Item>
            <Select.Item value="remote">Remote</Select.Item>
            <Select.Item value="hybrid">Hybrid</Select.Item>
            <Select.Item value="onsite">On-Site</Select.Item>
          </Select.Content>
        </Select.Root>

        <TextField.Root
          placeholder="Min Salary"
          type="number"
          value={filters.salaryMin}
          onChange={(e) => setFilters({ ...filters, salaryMin: e.target.value })}
        />

        <TextField.Root
          placeholder="Max Salary"
          type="number"
          value={filters.salaryMax}
          onChange={(e) => setFilters({ ...filters, salaryMax: e.target.value })}
        />
      </div>

      <div className="flex gap-3">
        <Button
          type="submit"
          className="flex-1 bg-indigo-600 text-white hover:bg-indigo-700"
        >
          Search Jobs
        </Button>
        <Button
          type="button"
          onClick={handleReset}
          variant="outline"
          className="flex-1"
        >
          Reset Filters
        </Button>
      </div>
    </form>
  );
}
