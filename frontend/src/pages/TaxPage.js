import React from "react";
import { Landmark } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import TaxSummaryPanel from "@/components/tax/TaxSummaryPanel";
import FakturPanel from "@/components/tax/FakturPanel";
import TaxRecordsPanel from "@/components/tax/TaxRecordsPanel";
import FakturExportPanel from "@/components/tax/FakturExportPanel";
import WithholdingPanel from "@/components/tax/WithholdingPanel";
import VatReturnPanel from "@/components/tax/VatReturnPanel";
import useTabParam from "@/hooks/useTabParam";
import { TAX, P49 } from "@/constants/testIds";

// Satu route (/tax) dengan Tabs internal; tiap panel memuat datanya sendiri
// (loading/empty/error) agar file tetap ramping dan lulus guardrails. Tab aktif ikut URL
// supaya tautan dari layar lain (mis. "lengkapi NPWP dulu") mendarat di tab yang benar.
export default function TaxPage() {
  const [tab, setTab] = useTabParam("summary");
  return (
    <div data-testid={TAX.page} className="space-y-5">
      <div className="flex items-center gap-2">
        <Landmark className="h-5 w-5 text-primary" />
        <h1 className="font-heading text-xl font-semibold">Perpajakan &amp; Kepatuhan</h1>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="flex-wrap">
          <TabsTrigger data-testid={TAX.tabSummary} value="summary">Ringkasan &amp; SPT PPN</TabsTrigger>
          <TabsTrigger data-testid={TAX.tabFaktur} value="faktur">Faktur Pajak</TabsTrigger>
          <TabsTrigger data-testid={P49.fakturExportTab} value="faktur-export">e-Faktur &amp; Ekspor</TabsTrigger>
          <TabsTrigger data-testid={P49.bupotTab} value="bupot">Bukti Potong (e-Bupot)</TabsTrigger>
          <TabsTrigger data-testid={P49.vatTab} value="vat">Rekap SPT Masa PPN</TabsTrigger>
          <TabsTrigger data-testid={TAX.tabRecords} value="records">Catatan Pajak</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="mt-4"><TaxSummaryPanel /></TabsContent>
        <TabsContent value="faktur" className="mt-4"><FakturPanel /></TabsContent>
        <TabsContent value="faktur-export" className="mt-4"><FakturExportPanel /></TabsContent>
        <TabsContent value="bupot" className="mt-4"><WithholdingPanel /></TabsContent>
        <TabsContent value="vat" className="mt-4"><VatReturnPanel /></TabsContent>
        <TabsContent value="records" className="mt-4"><TaxRecordsPanel /></TabsContent>
      </Tabs>
    </div>
  );
}
