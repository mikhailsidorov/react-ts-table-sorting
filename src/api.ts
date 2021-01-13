import { report } from "process";
import { IRegionResponse, IRegion } from 'models';

const api = async <T>(url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data:T = await response.json();
  return data;

}
export const getData = async () => {
  const rawData = await api<IRegionResponse[]>('opendata/7705851331-stat_library/data-2016-11-10T00-00-00-structure-2016-09-12T00-00-00.json');
  const data:IRegion[] = rawData.map(rawRegions => {
    const region: IRegion = {
      order: rawRegions.order,
      fullname: rawRegions.fullname,
      kopuk: rawRegions.kopuk,
      territory: rawRegions.territory,
      address: rawRegions.address,
      formName: rawRegions.formname,
      period: rawRegions.period,
      libraries: rawRegions.libraries,
      buildingsRepair: rawRegions.buildings_repair,
      buildingsDisrepair: rawRegions.buildings_disrepair,
      buildingsManagement: rawRegions.buildings_management,
      librariesComputers: rawRegions.libraries_computers,
      internet: rawRegions.internet,
      site: rawRegions.site,
      numberOfPersonalComputersInLibrariesUnits: rawRegions.number_of_personal_computers_in_libraries_units,
      computers: rawRegions.computers,
      digitalCatalogs: rawRegions.digital_catalogs,
      internetCatalogs: rawRegions.internet_catalogs,
      electronicCatalogueVolume: rawRegions.electronic_catalogue_volume,
      internetCatalogueVolume: rawRegions.internet_catalogue_volume,
      users: rawRegions.users,
      usersChildren: rawRegions.users_children,
      visits: rawRegions.visits,
      receivedCopies: rawRegions.received_copies,
      receivedWlectronic: rawRegions.received_electronic,
      outOfInstances: rawRegions.out_of_instances,
      droppedCopies: rawRegions.dropped_copies,
      copies: rawRegions.copies,
      copiesElectronic: rawRegions.copies_electronic,
      copiesIssued: rawRegions.copies_issued,
      issuedElectronic: rawRegions.issued_electronic,
      copiesIssuedChildren: rawRegions.copies_issued_children,
      subscribers: rawRegions.subscribers,
      individualSubscribersInformationServicesUnits: rawRegions.individual_subscribers_information_services_units,
      visitsSites: rawRegions.visits_sites,
      employees: rawRegions.employees,
      employeesStaff: rawRegions.employees_staff,
      staffHigheeducated: rawRegions.staff_higheeducated,
      staffVocationalPeople: rawRegions.staff_vocational_people,
      funds: rawRegions.funds,
      fundsBudget: rawRegions.funds_budget,
      fundsEntrepreneurial: rawRegions.funds_entrepreneurial,
      fundsMainActivityThousandRubles: rawRegions.funds_main_activity_thousand_rubles,
      fundsUsed: rawRegions.funds_used,
      fundsStaffThousandRubles: rawRegions.funds_staff_thousand_rubles,
      fundsAcquisition: rawRegions.funds_acquisition,
    }
    return region;
  })
  return data;
}
