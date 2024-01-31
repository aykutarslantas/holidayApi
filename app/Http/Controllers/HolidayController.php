<?php

namespace App\Http\Controllers;

use App\Models\Country;
use App\Models\Holiday;
use Carbon\Carbon;
use Illuminate\Http\Request;
use GuzzleHttp\Client;


class HolidayController extends Controller
{

    public function getHolidays(Request $request)
    {
        $validated = $request->validate([
            'country_code' => 'required',
            'year' => 'required|integer'
        ]);

        $response = $this->getHolidaysFromApi($validated['country_code'], $validated['year']);
        if ($response) {
            return response()->json($response);
        }

        return response()->json(['message' => 'fail']);
    }


    public function getHolidaysFromApi($contryIso, $year)
    {
        $client = new Client(['verify' => false]);
        $response = $client->request('GET', "https://date.nager.at/Api/v2/PublicHolidays/{$year}/{$contryIso}");

        if ($response->getStatusCode() == 200) {
            $holidays = json_decode($response->getBody(), true);
            return $holidays;
        }

        return false;
    }

    public function storeHoliday(Request $request)
    {
        $validated = $request->validate([
            'country' => 'required|string',
            'selected' => 'required|array'
        ]);

        $year = Carbon::createFromFormat('Y-m-d', $validated['selected'][0])->year;
        $allHolidays = $this->getHolidaysFromApi($validated['country'], $year);

        if ($allHolidays) {
            foreach ($allHolidays as $holiday) {
                if (in_array($holiday['date'], $validated['selected'])) {

                    $existingHoliday = Holiday::where('country_code', $validated['country'])
                        ->where('year', $year)
                        ->where('date', $holiday['date'])
                        ->first();

                    if (!$existingHoliday) {
                        $newHoliday = new Holiday();
                        $newHoliday->country_code = $validated['country'];
                        $newHoliday->year = $year;
                        $newHoliday->date = $holiday['date'];
                        $newHoliday->name = $holiday['name'];
                        $newHoliday->note = null;

                        $newHoliday->save();
                    }
                }
            }

            return response()->json(['message' => 'Selected holidays saved successfully'], 201);
        }

        return response()->json(['message' => 'Failed to fetch holidays from API or no holidays found'], 400);
    }


    public function getHolidaysFromTable()
    {
        $response = Holiday::all();
        return response()->json($response);
    }

    public function getHolidaysDateFromTable(Request $request)
    {
        $validated = $request->validate([
            'country' => 'required|string',
            'year' => 'required|int'
        ]);

        $response = Holiday::select('date')->where('year', $validated['year'])->where('country_code', $validated['country'])->get();
        return response()->json($response);
    }

    public function updateHoliday(Request $request, $id)
    {
        $validated = $request->validate([
            'date' => 'required|date',
            'name' => 'required|string',
            'note' => 'nullable|string'
        ]);

        $holiday = Holiday::findOrFail($id);
        $holiday->date = $validated['date'];
        $holiday->name = $validated['name'];
        $holiday->note = $validated['note'];

        $holiday->save();

        return response()->json(['message' => 'Holiday updated successfully'], 200);
    }


    public function getCountries()
    {
        $countries = Country::all();
        return response()->json($countries);
    }
}
