"use client";

import { useState } from "react";
import { appConfig } from "@/lib/config";
import { validateEmail, validatePin, validateName } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AddressForm } from "./address-form";

const emptyAddress = {
  line1: "",
  line2: "",
  state: "",
  city: "",
  pin: "",
};

export function UserForm({ onSubmit, onCancel, initialUser }) {
  const [formData, setFormData] = useState(
    initialUser || {
      id: Date.now().toString(),
      name: "",
      email: "",
      linkedinUrl: "",
      gender: "",
      address: emptyAddress,
    }
  );

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (
      !validateName(
        formData.name,
        appConfig.form.name.minLength,
        appConfig.form.name.maxLength
      )
    ) {
      newErrors.name = `Name must be between ${appConfig.form.name.minLength} and ${appConfig.form.name.maxLength} characters`;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Gender validation
    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }

    // Address validation
    if (!formData.address.line1.trim()) {
      newErrors["address.line1"] = "Address Line 1 is required";
    }
    if (!formData.address.state) {
      newErrors["address.state"] = "State is required";
    }
    if (!formData.address.city) {
      newErrors["address.city"] = "City is required";
    }
    if (!formData.address.pin.trim()) {
      newErrors["address.pin"] = "PIN is required";
    } else if (!validatePin(formData.address.pin)) {
      newErrors["address.pin"] = "PIN must be 5-6 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4 flex gap-4">
        <div>
          <Label htmlFor="name" className="mb-2">
            Name *
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter full name"
            disabled={!appConfig.form.editable}
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && (
            <p className="text-sm text-red-500 mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email" className="mb-2">
            Email *
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="Enter email address"
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email}</p>
          )}
        </div>
      </div>
      <div className="space-y-4 flex gap-4">
        <div className="flex-1">
          <Label htmlFor="linkedin" className="mb-2">
            LinkedIn URL
          </Label>
          <Input
            id="linkedin"
            type="text"
            value={formData.linkedinUrl}
            onChange={(e) =>
              setFormData({ ...formData, linkedinUrl: e.target.value })
            }
            placeholder="https://linkedin.com/in/yourprofile"
          />
        </div>

        <div className="flex-1">
          <Label htmlFor="gender" className="mb-2">
            Gender *
          </Label>
          <Select
            value={formData.gender}
            onValueChange={(gender) => setFormData({ ...formData, gender })}
          >
            <SelectTrigger
              id="gender"
              className={errors.gender ? "border-red-500 w-full" : "w-full"}
            >
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          {errors.gender && (
            <p className="text-sm text-red-500 mt-1">{errors.gender}</p>
          )}
        </div>
      </div>
      <AddressForm
        address={formData.address}
        onChange={(address) => setFormData({ ...formData, address })}
        errors={errors}
      />

      <div className="flex gap-4 pt-4">
        <Button type="submit" className="flex-1">
          {initialUser ? "Update User" : "Add User"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1 bg-transparent"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
