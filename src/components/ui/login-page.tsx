import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl font-bold text-gray-900">Välkommen till Kundportalen</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              E-post
            </Label>
            <Input id="email" type="email" placeholder="din@email.se" className="w-full" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
              Lösenord
            </Label>
            <Input id="password" type="password" className="w-full" required />
          </div>
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5">
            Logga in
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
