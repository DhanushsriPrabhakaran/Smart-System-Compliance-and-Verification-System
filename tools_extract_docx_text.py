import zipfile, xml.etree.ElementTree as ET
from pathlib import Path

base = Path(r'c:\Users\dhanu\Downloads\ssc-phase1\syllabus web')
for p in sorted(base.glob('*.docx')):
    print(f'\n==== {p.name} ====')
    try:
        with zipfile.ZipFile(p) as z:
            xml = z.read('word/document.xml')
        root = ET.fromstring(xml)
        ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
        parts = []
        for t in root.findall('.//w:t', ns):
            txt = t.text or ''
            if txt.strip():
                parts.append(txt)
        text = ' '.join(parts)
        print(text[:50000])
    except Exception as e:
        print('ERROR', e)
