"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AddressForm({ address, onChange, errors }) {
  const [statesCities, setStatesCities] = useState(null)
  const [cities, setCities] = useState([])

  useEffect(() => {
    fetch("/data/states-cities.json")
      .then((res) => res.json())
      .then((data) => {
        setStatesCities(data)
        if (address.state) {
          const state = data.states.find((s) => s.id === address.state)
          if (state) {
            setCities(state.cities)
          }
        }
      })
  }, [])

  const handleStateChange = (stateId) => {
    const state = statesCities?.states.find((s) => s.id === stateId)
    const newCities = state?.cities || []
    setCities(newCities)
    onChange({
      ...address,
      state: stateId,
      city: "",
    })
  }

  return (
    <div className="space-y-4 border-t pt-4">
      <h3 className="font-semibold">Address</h3>

      <div>
        <Label htmlFor="line1" className="mb-2">Line 1 *</Label>
        <Input
          id="line1"
          value={address.line1}
          onChange={(e) => onChange({ ...address, line1: e.target.value })}
          placeholder="Street address"
          className={errors["address.line1"] ? "border-red-500" : ""}
        />
        {errors["address.line1"] && <p className="text-sm text-red-500 mt-1">{errors["address.line1"]}</p>}
      </div>

      <div>
        <Label htmlFor="line2" className="mb-2">Line 2</Label>
        <Input
          id="line2"
          value={address.line2}
          onChange={(e) => onChange({ ...address, line2: e.target.value })}
          placeholder="Apartment, suite, etc."
        />
      </div>

      <div className="flex gap-4 w-full">
        <div className="flex-1">
          <Label htmlFor="state" className="mb-2">State *</Label>
          <Select value={address.state} onValueChange={handleStateChange}>
            <SelectTrigger id="state" className={errors["address.state"] ? "border-red-500 w-full" : " w-full"}>
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              {statesCities?.states.map((state) => (
                <SelectItem key={state.id} value={state.id}>
                  {state.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors["address.state"] && <p className="text-sm text-red-500 mt-1">{errors["address.state"]}</p>}
        </div>

        <div className="flex-1">
          <Label htmlFor="city" className="mb-2">City *</Label>
          <Select value={address.city} onValueChange={(city) => onChange({ ...address, city })}>
            <SelectTrigger id="city" className={errors["address.city"] ? "border-red-500 w-full" : "w-full"}>
              <SelectValue placeholder="Select city" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors["address.city"] && <p className="text-sm text-red-500 mt-1">{errors["address.city"]}</p>}
        </div>
      </div>

      <div>
        <Label htmlFor="pin" className="mb-2">PIN *</Label>
        <Input
          id="pin"
          value={address.pin}
          onChange={(e) => onChange({ ...address, pin: e.target.value })}
          placeholder="5-6 digit PIN"
          className={errors["address.pin"] ? "border-red-500" : ""}
        />
        {errors["address.pin"] && <p className="text-sm text-red-500 mt-1">{errors["address.pin"]}</p>}
      </div>
    </div>
  )
}
