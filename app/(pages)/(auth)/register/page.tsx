import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const RegisterPage = () => {
    return ( 
        <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Üye Ol</CardTitle>
          <CardDescription>
            Hesap oluşturmak için bilgilerini gir
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">Adın</Label>
                <Input id="first-name" placeholder="Naruto" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Soyadın</Label>
                <Input id="last-name" placeholder="Uzumaki" required />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">E Posta</Label>
              <Input
                id="email"
                type="email"
                placeholder="konoha@ornek.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Şifre</Label>
              <Input id="password" type="password" />
            </div>
            <Button type="submit" className="w-full">
              Hesap oluştur
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Zaten hesabın var mı?{" "}
            <Link href="/login" className="underline">
              Giriş yap
            </Link>
          </div>
        </CardContent>
      </Card>
     );
}
 
export default RegisterPage;